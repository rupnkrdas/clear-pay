import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingSpinner = () => {
	return (
		<div className="flex items-start justify-center h-screen mt-24">
			<Oval
				type="TailSpin"
				color="#1F2937"
				height={50}
				width={50}
				secondaryColor="##1F2932"
			/>
		</div>
	);
};

export default LoadingSpinner;
