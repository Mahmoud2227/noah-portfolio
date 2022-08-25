import React, {useEffect, useState} from "react";
import {DashboardWidget} from "@sanity/dashboard";
import {Stack, Text, Flex, Card, Spinner, TabList, Tab, TabPanel} from "@sanity/ui";
import {AiOutlineOrderedList, AiFillPieChart} from "react-icons/ai";
import sanityClient from "part:@sanity/base/client";
import {PieChart, Pie, Tooltip, ResponsiveContainer} from "recharts";

const client = sanityClient.withConfig({apiVersion: "2022-08-07"});

function ConcertsList() {
	const [isLoading, setIsLoading] = useState(false);
	const [id, setId] = useState("list");
	const [data, setData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		client
			.fetch(
				`*[_type == "concert"] | order(_createdAt desc)[0...6]{
			attendeesCount,
			"name":title,
			_id
		}`
			)
			.then((res) => {
				setIsLoading(false);
				setData(res);
			});
	}, []);

	return (
		<DashboardWidget
			header='Latest Concerts'
			footer={
				<Flex
					padding={4}
					direction='column'
					align='center'
					justify='space-between'
					style={{minHeight: 300}}>
					<TabList space={2}>
						<Tab
							aria-controls='list-panel'
							icon={AiOutlineOrderedList}
							id='list-tab'
							label='List'
							onClick={() => setId("list")}
							selected={id === "list"}
							space={2}
						/>
						<Tab
							aria-controls='chart-panel'
							icon={AiFillPieChart}
							id='chart-tab'
							label='Chart'
							onClick={() => setId("chart")}
							selected={id === "chart"}
							space={2}
						/>
					</TabList>

					<TabPanel
						aria-labelledby='list-tab'
						hidden={id !== "list"}
						id='list-panel'
						display='flex'
						flex={1}
						style={{width: "100%"}}>
						{isLoading && (
							<Flex justify='center'>
								<Spinner muted />
							</Flex>
						)}
						{!isLoading && (
							<Card border marginTop={2} padding={2} radius={2} style={{width: "100%"}}>
								<Stack padding={4} space={[3, 3, 4, 5]}>
									{data.map((item) => (
										<Flex key={item._id} size={[2, 2, 3, 4]} justify='space-between'>
											<Text style={{maxWidth: 250, marginRight: 10}}>{item.name}</Text>
											<Text>{item.attendeesCount}</Text>
										</Flex>
									))}
								</Stack>
							</Card>
						)}
					</TabPanel>

					<TabPanel
						aria-labelledby='chart-tab'
						hidden={id !== "chart"}
						id='chart-panel'
						style={{width: "100%", height: "100%"}}>
						<ResponsiveContainer width='100%' minHeight={250} height='100%'>
							<PieChart width={400} height={400}>
								<Pie
									dataKey='attendeesCount'
									data={data}
									cx='50%'
									cy='50%'
									innerRadius={40}
									outerRadius={80}
									fill='#82ca9d'
									label
								/>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</TabPanel>
				</Flex>
			}></DashboardWidget>
	);
}

export default {
	name: "concerts-list",
	component: ConcertsList,
};
