import styled from "styled-components";
import HeaderTop from "./components/headTop";
import FooterBox from "./components/footerBox";
import { Container,Row,Card, Button,Dropdown,Col,FloatingLabel,Form,Alert} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import ChainJson from "./api/chains.json";
import {X} from "react-bootstrap-icons";
import ERC20 from "./abi/NEW_ERC20.json";
import Loading from "./components/loading.jsx";
import LogoImg from "./assets/logo.png";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .liBox,.li{
    margin-bottom: 40px;
  }
  .btn{
    background-color: purple;
    color: white;
    font-family: "Helvetica";
    border: 0;
  }
`

const ContentBox = styled(Container)`
    margin: 40px auto;
  flex-grow: 1;
`

const TopLine = styled.div`
    margin:-20px -12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Lft = styled.div`
    display: flex;
  align-items: center;
  .imgBox{
    width: 96px;
    height: 96px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #EDEFF0;
    padding: 13px;
    margin-right: 16px;
    box-sizing: border-box;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
`
const TitleBox = styled.div`
  font-family: Helvetica;
  font-size: 16px;
  .tit{
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
  }
`

const ChainBox = styled(Dropdown)`
  margin-right: 20px;
  border: 1px solid #000;
  font-size: 16px;
  height: 46px;
  padding: 0 20px;
  border-radius: 5px;
  line-height: 40px;
  display: flex;
  align-items: center;
  button{
    height: 42px;
    &:after{
     margin-left: 10px;
    }
  }
`

const CardBox = styled(Card)`
  border:0;
  box-shadow: 0 0 5px #ccc;
  border-radius: 6px;
  padding: 40px ;
  flex-grow: 1;
`


const AddressBox = styled.span`
    border: 1px solid #000;
    font-size: 16px;
    height: 46px;
  padding: 0 20px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  .close{
    margin-left: 20px;
    cursor: pointer;
  }
`

const BoxRht = styled.div`
    display: flex;
  align-items: center;
  justify-content: flex-end;
`

const HistoryBox = styled.div`
  padding-left: 20px;
    .titleRht{
      font-weight: bold;
      color: #000;
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  .close{
    padding-top: 10px;
    text-align: right;
    padding-bottom: 10px;
    
  }
  ul{
    li{
      background: #f8f8f8;
      padding:0 20px 20px;
      box-shadow: 0 0 5px #ccc;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  }
`
const CenterBox = styled.div`
    display: flex;
  justify-content: center;
  margin-bottom: 40px;
  position: relative;

  .inner-btn {
    position: absolute;
    font-size: 30px;
    border: none;
    background-color: transparent;
    line-height: 35px;
    top:10px;
    left: calc(100% - 40px);
    z-index: 99999;
  }

  .inner-btn:hover {
    color: purple;
  }
`

const MidBox = styled.div`
    position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
`

const BtmBox = styled.div`
    background: #f5f5f5;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  span{
    margin-right: 20px;
  }
`

const TipsTop = styled.div`
    width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background: #f5f5f5;
a{
  color: purple;
  text-decoration: underline;
  font-weight: bold;
}
`

export default function Home(){

    const [chainName ,setChainName] = useState('');
    const [account ,setAccount] = useState('');

    const [tokeName ,setTokeName] = useState('');
    const [tokenSymbol ,setTokeSymbol] = useState('');
    const [tokenDecimals ,setTokenDecimals] = useState('');
    const [totalSupply ,setTotalSupply] = useState('');
    const [initial ,setInitial] = useState('');
    const [provider,setProvider] = useState(null)
    const [show,setShow] = useState(false);
    const [tips,setTips] = useState('');
    const [showSuccess,setShowSuccess] = useState(false);
    const [showFailed,setSHowFailed] = useState(false);
    const [result,setResult] = useState('')

    useEffect(()=>{
        const getChain =  async() =>{
            const web3Provider = new ethers.BrowserProvider(window.ethereum)
            const { chainId } = await web3Provider.getNetwork();
            const ChainArr = ChainJson.filter(item=>item.chainId === Number(chainId));
            setProvider(web3Provider)
            setChainName(ChainArr[0]?.name);
        }
        getChain();
    },[ ])

    const AddressToShow = (address) => {
        if (!address) return "...";

        let frontStr = address.substring(0, 4);

        let afterStr = address.substring(address.length - 4, address.length);

        return `${frontStr}...${afterStr}`;
    };

    useEffect(() => {
        const { ethereum} = window;
        if(typeof ethereum == 'undefined'){
            return;
        }
        ethereum.on('chainChanged', () => {
            window.location.reload();

        });

        ethereum.on('accountsChanged', () => {
            sessionStorage.removeItem('account');
            window.location.reload();

        });

        const logInfo = sessionStorage.getItem('account');
        if(account != null){
            setAccount(logInfo)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () =>{
        sessionStorage.removeItem('account');
        setAccount(null)
    }
    const connectWallet = async () => {
        const { ethereum } = window;
        if (typeof ethereum == 'undefined') {
            return {
                type:'error'
            } ;
        }
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        sessionStorage.setItem("account", accounts[0]);
        setAccount(accounts[0])

    }
    const handleInput = (e) => {
        const { name,value } = e.target;

        switch(name){
            case "TokenName":
                setTokeName(value);
                break;
            case "TokenSymbol":
                setTokeSymbol(value);
                break;
            case "TokenDecimals":
                setTokenDecimals(value);
                break;
            case "TotalSupply":
                setTotalSupply(value);
                break;
            case "InitialSupply":
                setInitial(value);
                break;
        }
    }

    const submit = async () =>{
        setShow(true)
        setTips('Deploy contract')

        const signer = await provider.getSigner();


        const _maxTokens = ethers.parseUnits(totalSupply,Number(tokenDecimals));
        const _initBalance = ethers.parseUnits(initial,Number(tokenDecimals));
        // "My TOKEN","MTK",16,_maxTokens,_initBalance
        const contractD = new ethers.ContractFactory(ERC20.abi,ERC20.bytecode,signer)
        const rt = await contractD.deploy(tokeName,tokenSymbol,tokenDecimals,_maxTokens,_initBalance);
        const rst = await rt.waitForDeployment();
        setResult(rst.target)

        setTips('Waiting Metamask ....')
        window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: rst.target,
                    symbol: tokenSymbol,
                    decimals: tokenDecimals,
                    image: "",
                },
            },
        })
            .then((success) => {
                setShow(false);
                if (success) {
                    console.log('success',success);
                    setShowSuccess(true);
                    setTimeout(()=>{
                        setShowSuccess(false);
                    },2000)
                } else {
                    console.error('failed');
                    setSHowFailed(true);
                    setTimeout(()=>{
                        setSHowFailed(false);
                    },2000)
                }
            })
            .catch((error) => {
                console.error('MetaMask:', error);
            });


    }

    return <MainContent>
        {
            show && <Loading  tips={tips} />
        }

        <HeaderTop />
        <ContentBox>
            <TopLine>
                <Lft>
                    <div className="imgBox"><img src={LogoImg} alt=""/></div>
                    <TitleBox>
                        <div className="tit">Turbo Deploy </div>
                        <div>Easily deploy Smart Contract for an ERC20 Token on Ethereum Network.<br/>
                            No login. No setup. No coding required.</div>
                    </TitleBox>
                </Lft>
                <BoxRht >
                    {
                        !!chainName?.length && <ChainBox>
                            {chainName}
                        </ChainBox>
                    }
                    {
                        !account && <Button variant="flat" onClick={connectWallet} >Connect Wallet</Button>
                    }

                    {
                        !!account && <AddressBox>{AddressToShow(account)}
                            <div className="close" onClick={()=>logout()}>
                                <X />
                            </div></AddressBox>
                    }
                </BoxRht>
            </TopLine>
            <Row>
                <MidBox>
                    {
                        showSuccess && <Alert variant="success">
                            <span>Success !</span>
                        </Alert>
                    }
                    {
                        showFailed && <Alert variant="danger"> Failed !</Alert>
                    }
                </MidBox>


                <CardBox body>
                    <Row>
                        <Col>
                            <CenterBox>
                                <TipsTop>
                                    <div>Export ERC20 Abi: <a href="/NEW_ERC20.json" target="_blank" rel="noreferrer">ERC20 ABI</a></div>
                                    <div>We would recommend utilizing the <a href="https://web3camp.us/oneclick-dapp" target="_blank" rel="noreferrer">oneClick</a> DApp for invoking and validating the contract.</div>
                                </TipsTop>
                            </CenterBox>

                        </Col>
                    </Row>
                    <Row>
                        <Col >

                            <CenterBox>
                                <Col>
                                    <FloatingLabel
                                        controlId="name"
                                        label="Token Name"
                                    >
                                        <Form.Control
                                            type="text"
                                            name='TokenName'
                                            placeholder="Token Name"
                                            value={tokeName}
                                            onChange={(e)=>handleInput(e)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </CenterBox>
                            <CenterBox>
                                <Col>
                                    <FloatingLabel
                                        controlId="symbol"
                                        label="Token Symbol"
                                    >
                                        <Form.Control
                                            type="text"
                                            name='TokenSymbol'
                                            placeholder="Token Symbol"
                                            value={tokenSymbol}
                                            onChange={(e)=>handleInput(e)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </CenterBox>
                            <CenterBox>
                                <Col>
                                    <FloatingLabel
                                        controlId="decimals"
                                        label="Token Decimals"
                                    >
                                        <Form.Control
                                            type="text"
                                            name='TokenDecimals'
                                            placeholder="Token Decimals"
                                            value={tokenDecimals}
                                            onChange={(e)=>handleInput(e)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </CenterBox>
                            <hr/>

                            <CenterBox>
                                <Col>
                                    <FloatingLabel
                                        controlId="supply"
                                        label="Total Supply"
                                    >
                                        <Form.Control
                                            type="text"
                                            name='TotalSupply'
                                            placeholder="Total Supply"
                                            value={totalSupply}
                                            onChange={(e)=>handleInput(e)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </CenterBox>
                            <CenterBox>
                                <Col>
                                    <FloatingLabel
                                        controlId="Initial"
                                        label="Initial Supply"
                                    >
                                        <Form.Control
                                            type="text"
                                            name='InitialSupply'
                                            placeholder="Initial Supply"
                                            value={initial}
                                            onChange={(e)=>handleInput(e)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </CenterBox>
                            <CenterBox>
                                <Button variant="flat" onClick={()=>submit()}>Deploy ERC20</Button>
                            </CenterBox>
                        </Col>
                    </Row>
                    {
                        !!result && <BtmBox>
                            <span> ERC20 Address: </span>
                            <div> {result}</div>

                        </BtmBox>
                    }

                </CardBox>
            </Row>
        </ContentBox>
        <FooterBox />
    </MainContent>
}
