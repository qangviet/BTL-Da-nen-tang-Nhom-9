import React from "react";
import { View, Image } from "react-native";

const LogoHust = ({ width, height }) => {
	const styles = {
		logo: {
			// 150 - 30
			width: width,
			height: height,
		},
	};
	return (
		<View>
			<Image source={require("../assets/logo.png")} style={styles.logo} />
		</View>
	);
};

const LogoBK = ({ width, height }) => {
	const styles = {
		logo: {
			// 150 - 30
			width: width,
			height: height,
		},
	};
	return (
		<View>
			<Image source={require("../assets/logoBK160x240.png")} style={styles.logo} />
		</View>
	);
};

export { LogoHust, LogoBK };
