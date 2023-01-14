import "./Footer.css";
import { AiFillFacebook } from "react-icons/ai";
import { GrTwitter } from "react-icons/gr";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { SiGooglemaps } from "react-icons/si";
import { BiTimeFive } from "react-icons/bi";
import { BsFillTelephoneForwardFill } from "react-icons/bs";


function Footer() {
  return (
    <div className="footer">
      <div className="ctn">
        <div className="box">
          <h3>Univerese</h3>
          <ul className="social">
            <li>
              <button className="facebook">
                <AiFillFacebook />
              </button>
            </li>
            <li>
              <button className="twitter">
                <GrTwitter />
              </button>
            </li>
            <li>
              <button className="youtube">
                <BsYoutube />
              </button>
            </li>
          </ul>
          <p className="text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus nulla rem, dignissimos iste aspernatur
          </p>
        </div>
        <div className="box">
          <ul className="links">
            <li><button><AiOutlineDoubleRight className="i" /> Important Link 1</button></li>
            <li><button><AiOutlineDoubleRight className="i" /> Important Link 2</button></li>
            <li><button><AiOutlineDoubleRight className="i" /> Important Link 3</button></li>
            <li><button><AiOutlineDoubleRight className="i" /> Important Link 4</button></li>
            <li><button><AiOutlineDoubleRight className="i" /> Important Link 5</button></li>
          </ul>
        </div>
        <div className="box">
          <div className="line">
            <SiGooglemaps className="i" />
            <div className="info">Morocco, Tetouan</div>
          </div>
          <div className="line">
            <BiTimeFive className="i" />
            <div className="info">Business Hours: From 10:00 To 18:00</div>
          </div>
          <div className="line">
            <BsFillTelephoneForwardFill className="i" />
            <div className="info">
              <span>+20123456789</span>
              <span>+20198765432</span>
            </div>
          </div>
        </div>
      </div>
      <p className="copyright">Made With &lt;3 By amineChairi</p>
    </div>
  )
}
export default Footer;