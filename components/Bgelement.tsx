import * as React from "react"
import Svg, { Circle } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={2400} height={1080} className=" absolute" {...props}>
    <Circle cx={200} cy={100} r={300} fill="#5680EC" opacity={0.26} />
    <Circle cx={200} cy={60} r={300} fill="#5680EC" opacity={0.52} />
    <Circle cx={200} cy={20} r={300} fill="#5680EC" opacity={1}/>
  </Svg>
)
export default SvgComponent
