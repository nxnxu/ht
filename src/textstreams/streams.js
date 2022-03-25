import assembly from "./assembly";
import msf from "./msf";
import nmap from "./nmap";
import sqlmap from "./sqlmap";
import aircrack from "./aircrack";
import bitcoin from "./bitcoin";
import linux from "./linux";

const streams = [aircrack, sqlmap, nmap, msf, assembly, bitcoin, linux];

export default streams;
