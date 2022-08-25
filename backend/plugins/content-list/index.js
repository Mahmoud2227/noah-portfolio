import React, {useEffect, useState} from "react";
import {DashboardWidget} from "@sanity/dashboard";
import {Stack, Text, Flex, Card, Label, Spinner, TabList, Tab, TabPanel} from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({apiVersion: "2022-08-07"});

function ContentList({title, type}) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		client
			.fetch(
				`*[_type == "${type}"] | order(_createdAt desc)[0...6]{
					title,
					_createdAt,
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
			header={title}
			footer={
				<Card style={{minHeight: 300, height: "100%"}} padding={4}>
					{isLoading && (
						<Flex justify='center'>
							<Spinner muted />
						</Flex>
					)}
					{!isLoading && (
						<Stack space={[3, 3, 4, 5]}>
							{data.map((item, i) => (
								<Flex key={item._id} align='center' justify='space-between'>
									<Text weight='medium' style={{maxWidth: 250}}>
										<span>{i + 1}. </span>
										{item.title}
									</Text>
									<Text>{new Date(item._createdAt).toLocaleDateString()}</Text>
								</Flex>
							))}
						</Stack>
					)}
				</Card>
			}></DashboardWidget>
	);
}

export default {
	name: "content-list",
	component: ContentList,
};
