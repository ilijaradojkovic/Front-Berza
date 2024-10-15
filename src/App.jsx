import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Box } from "@mantine/core";
import Aside from "./components/BetSummary/Aside";
import { MantineProvider } from "@mantine/core";
import Navbar from "./components/Navbar";
import { useViewportSize } from "@mantine/hooks";
import MiddleSection from "./components/MiddleSection";
import { useMutation, useQuery } from "react-query";
import { Notifications } from "@mantine/notifications";
import { Chat } from "./components/chat/Chat";
import { getMozzartToken, getUserData,getUser, getCasinoConfiguration, updateUserPreferences, updateUserBalance } from "./communication/rest";
import { connectToGameState } from "./communication/socket";
import { ToastContainer } from "react-toastify";

function App() {
  const backgroundMusic = useRef(null);

  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isAnimationOn, setIsAnimationOn] = useState(false);
  const [currentAvatarSelectedIndex,setCurrentAvatarSelectedIndex] =useState(0)
  const [isLandScape, setIsLandscape] = useState(false);
  const [lastValue, setLastValue] = useState(0);
  const { width, height } = useViewportSize();
  const [bets, setBets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [audioPermission, setAudioPermission] = useState(false);
  const [gameState, setGameState] = useState("");
  const [tick, setTick] = useState(0);
  const [casinoConfigurationData,setCasinoConfigurationData] =useState()
  const [isAvailableToUpdateBalance,setIsAvailableToUpdateBalance]=useState(false)
  
  const updateUserPreferencesMutation = useMutation((userPreferences) => updateUserPreferences(userPreferences), {
    onSuccess: (response) => {
      if (response.data) {
       console.log(response.data)
        // getUser(); // Call the refetch method to get user data
      }
    },
  });

  const addAccountMutation = useMutation((userToken) => getMozzartToken(userToken), {
    onSuccess: (response) => {
      if (response.data) {
        const jwt = response.data?.data.session.accessToken;
        localStorage.setItem('accessToken', jwt);
        // getUser(); // Call the refetch method to get user data
      }
    },
  });




  const { data:user, isLoading, refetch } = useQuery({
    queryKey: ["user"], 
    queryFn:  ()=>getUser(), 
    enabled:true,
    refetchInterval:1000
  });


  const { data:casinoConfiguration, refetch:refetchCasinoConfiguration } = useQuery({
    queryKey: ["casino-configuration"], 
    queryFn:  ()=>getCasinoConfiguration(), 
    enabled:true,
  });

  useEffect(()=>{
      setCasinoConfigurationData(casinoConfiguration?.data?.data.configuration)
  },[casinoConfiguration])


  // const { data:userData, isLoading:isUserDataLoading } = useQuery({
  //   queryKey: ["user"], 
  //   queryFn:  ()=>getUserData(), 
  //   retry:false,
  // });



  useEffect(() => {
    refetchCasinoConfiguration()
    const messageHandler = (event) => {
      // if (event.origin !== 'http://localhost:5174') { // Replace with the origin of the parent window
      //   return;
      // }

      addAccountMutation.mutate(event.data.userId);
    };

    window.addEventListener('message', messageHandler);

    // Cleanup event listener
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  useEffect(() => {
    if (width > height) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
  }, [width, height]);

  useEffect(() => {
    let userData=user?.data?.data?.user;
    if(userData){
      setIsAnimationOn(currentUser?.preferences.isAnimationOn);
      setIsMusicOn(currentUser?.preferences.isMusicOn);
      setIsSoundOn(currentUser?.preferences.isSoundOn);
      setCurrentAvatarSelectedIndex(currentUser?.preferences.imageIndex)
      setCurrentUser(userData);
    }
  }, [user]);

  // Initialize socket connection
  useEffect(() => {
    connectToGameState(handleGameStatePayload);
  }, []);

  const handleGameStatePayload = (payload) => {
    setTick(payload.tick);
    setLastValue(payload.lastValue);
    if (payload.gameState !== gameState){
      setGameState(payload.gameState);
        
    } 
   
  };



  const playSound = () => {
    backgroundMusic.current.play();
  };

  const pauseSound = () => {
    backgroundMusic.current.pause();
  };

  useEffect(() => {
    if (isMusicOn) playSound();
    else pauseSound();
  }, [isMusicOn]);



  const handleSoundChangedOption=()=>{
    setIsSoundOn(!isSoundOn)
    updateUserPreferencesMutation.mutate({
      isSoundOn:!isSoundOn,
      isMusicOn:isMusicOn,
      isAnimationOn:isAnimationOn,
      imageIndex:currentAvatarSelectedIndex
    })
  }


  const handleMusicChangedOption=()=>{
    setIsMusicOn(!isMusicOn)
    updateUserPreferencesMutation.mutate({
      isSoundOn:isSoundOn,
      isMusicOn:!isMusicOn,
      isAnimationOn:isAnimationOn,
      imageIndex:currentAvatarSelectedIndex
    })
  }


  const handleAnimaitonChangedOption=()=>{
    setIsAnimationOn(!isAnimationOn)
    updateUserPreferencesMutation.mutate({
      isSoundOn:isSoundOn,
      isMusicOn:isMusicOn,
      isAnimationOn:!isAnimationOn,
      imageIndex:currentAvatarSelectedIndex
    })
  }

  const handleImageChange=(index)=>{
    setCurrentAvatarSelectedIndex(index)
    updateUserPreferencesMutation.mutate({
      isSoundOn:isSoundOn,
      isMusicOn:isMusicOn,
      isAnimationOn:isAnimationOn,
      imageIndex:index
    })
  }


  return (
    <MantineProvider
      theme={{
        colors: {
          "blue800": ["#12151E"],
          'blue700':['#1A1F2D'],
          'blue600': ['#212738'],
          'blue500':['#2A3146'],
          'gray':['#4B556D','#A2A8B7'],
          'white':['#EBEDF2','#A2A8B7'],
          'yellow':['#FFCB04'],
          'green':['#00FC83','#008563','#00FFB2','#00FFB2'],
          'black':['#000000'],
          'rose':['#B960FF'],
          'purple':['#685AB0'],
          'disabled':['#4D4F58']
        },
      }}
    >
      <Notifications />
      <audio
        ref={backgroundMusic}
        src="/src/assets/sounds/backgoundMusic.mp3"
        loop
      />
      <Box sx={theme=>({display:'flex',flexDirection:'column',height:'100vh',backgroundColor: theme.colors.blue800[0]})} >
        <Box
      
        >
          <Navbar
            isLandScape={isLandScape}
            currentUser={currentUser}
            setAudioPermission={setAudioPermission}
            audioPermission={audioPermission}
            isSoundOn={isSoundOn}
            isMusicOn={isMusicOn}
            isAnimationOn={isAnimationOn}
            selectedImageIndex={currentAvatarSelectedIndex}
            toggleSoundSetting={() => handleSoundChangedOption()}
            toggleMusicSetting={() => handleMusicChangedOption()}
            toggleAnimationSetting={() => handleAnimaitonChangedOption()}
            handleImageChange={(index)=>handleImageChange(index)}
          />
        </Box>

          <Box
            style={{
              display: "flex",
              flexDirection: isLandScape ? "row" : "column-reverse",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box style={{ width: "20%" }}>
              <Aside
                isLandScape={isLandScape}
                bets={bets}
                currentUser={currentUser}
                casinoConfiguration={casinoConfigurationData}
              />
            </Box>
            <Box
              style={{
                width: "60%",
              }}
            >
              <MiddleSection
                isLandScape={isLandScape}
                bets={bets}
                setBets={setBets}
                audioPermission={audioPermission}
                gameState={gameState}
                tick={tick}
                lastValue={lastValue}
                currentUser={currentUser}
                isAnimationOn={isAnimationOn}
                casinoConfigurationData={casinoConfigurationData}
              />
            </Box>
            <Box style={{ width: "20%"}}>
              <Chat currentUser={currentUser} />
            </Box>
          </Box>
     
      </Box>
    
    </MantineProvider>
  );
}

export default App;
