import React from "react";
import { useSelector } from "react-redux";
import GuestNavigation from "./guestNavigation";
import SVienNavigation from "./svienNavigation";
import GVienNavigation from "./gvienNavigation";

const ROLES = {
	GUEST: 0,
	SVIEN: 1,
	GVIEN: 2,
};

const MainNavigation = () => {
	const role = useSelector((state) => state.auth.role);

	switch (role) {
		case ROLES.GUEST:
			return <GuestNavigation />;
		case ROLES.SVIEN:
			return <SVienNavigation />;
		case ROLES.GVIEN:
			return <GVienNavigation />;
		default:
			return <GuestNavigation />;
	}
};

export default MainNavigation;
