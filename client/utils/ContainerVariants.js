const getContainerVariants = (direction) => {
	return {
		onScreen: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
        ease: "easeInOut",
        type: "spring"
			},
		},
		offScreen: {
			opacity: 0,
			x: direction === "left" ? "-100%" : "100%",
		},
	};
};

export default getContainerVariants;
