import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaSnapchatGhost, FaHome } from "react-icons/fa";
import { MdOutlineHomeWork  } from "react-icons/md"
import { Link } from "react-router-dom";
import logo from "./../../supports/assets/logo.png";
const Footer = () => {
  const web = [
    <BsTwitter />,
    <BsInstagram />,
    <BsFacebook />,
    <FaSnapchatGhost />,
  ];

  const mobile = [
    <Link to='/'><FaHome /></Link>  ,
    <Link to='/dashboard'><MdOutlineHomeWork  /></Link>,
  ]
  return (
    <>
    {/* web */}
    <div className="bg-white border-t-2 shadow-md shadow-gray-300 sticky bottom-0 h-20 w-full hidden md:flex items-center justify-center gap-6 mt-20">
      {web.map((web) => (
        <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
          {web}
        </div>
      ))}
    </div>
    
    {/* Mobile */}
    <div className="bg-white border-t-2 shadow-md shadow-gray-300 sticky bottom-0 h-20 w-full flex md:hidden items-center justify-center gap-6 ">
    <div className="h-2 md:flex pl-3">
         <img src={logo} className="object-cover h-5" alt="" />
    </div>
    {mobile.map((mobile) => (
      <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
        {mobile}
      </div>
    ))}
  </div>
  </>
  );
};

export default Footer;