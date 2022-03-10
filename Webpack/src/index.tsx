import React from "react";
import ReactDOM         from "react-dom";
import MyReactComponent from "./MyReactComponent";

console.log(<div>
	<a href="https://www.candicejoy.com">Bananas!</a>
	<br/>
</div>);

test("extra bananas!");

function test( banana:string ):void
{
	console.log(banana);
}

ReactDOM.render(
	<MyReactComponent />,
	document.getElementsByClassName("react-here")[0]
);