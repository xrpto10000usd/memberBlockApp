import { useEffect, useRef, useState } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View , Alert } from 'react-native';

// 1. Statically require all possible local images
const staticImages = {
  paper: require('@/assets/images/paper.png'),
  scissor: require('@/assets/images/scissor.png'),
  rock: require('@/assets/images/rock.png'),
  default: require('@/assets/images/defaultplay.png')
};

const computerPlayImage = [ require('@/assets/images/paper.png'), require('@/assets/images/scissor.png'), require('@/assets/images/rock.png') ]
const comChoiceMap = { '0':'paper' , '1':'scissor', '2':'rock' }

export default function SampleGameMain() {

    const [ currentIndex, setCurrentIndex] = useState(0);
    const [ userChoice , setUserChoice ]  = useState(false);
    const [ computerChoice , setComputerChoice] = useState(false);
    const [ result, setResult ] = useState<string | null>(null);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ gameCount, setGameCount ] = useState(5);
    const intervalRef = useRef(null);

    const winLoseLogic = (userChoice , computerChoice) => {

        const comChoice = comChoiceMap[computerChoice.toString()]

        if (comChoice == userChoice)
            return 'tie';

        if ((userChoice == 'rock' && comChoice == 'scissor') ||
            (userChoice == 'scissor' && comChoice == 'paper') ||
            (userChoice == 'paper' && comChoice == 'rock')
            ) {
            return 'win';
        }

        return 'lost'

    }

    const playAgain =()=> {
        setIsPlaying(false);
        setUserChoice(false);
        setResult(null);
        setComputerChoice(false);
    }

    const playGame =(choice)=> {

        if (gameCount > 0) {

            const currGameCount = gameCount-1;
            setGameCount(currGameCount);

        } else {

           Alert.alert('You need more credit', // 제목
                           'Would you do the mission?', // 메시지
                           [
                             {
                               text: 'No',
                               onPress: () => console.log('취소됨'),
                               style: 'cancel', // iOS에서 강조되지 않는 스타일로 표시
                             },
                             {
                               text: 'Yes',
                               onPress: () => console.log('확인됨')
                             },
                           ],
                           { cancelable: false } // 영역 바깥 클릭 시 닫힘 방지 (Android 전용));
                        );
        }

        setIsPlaying(true);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setUserChoice(choice);
        setComputerChoice(comChoiceMap[currentIndex]);
        const result = winLoseLogic(choice, currentIndex);
        setResult(result);

    }

    const renderUserChoiceImage = (userChoice) => {
        if (!userChoice)
            return staticImages['default']
        else
            return staticImages[userChoice];
    }

    const renderComputerChoiceImage = () => {
        return computerPlayImage[currentIndex];
    }

    useEffect(() => {
        if (isPlaying) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % computerPlayImage.length);
        }, 1000);

        return () => clearInterval(intervalRef.current);
      }, [isPlaying]);

    return (
            <View style={styles.container}>
                <Image source={computerPlayImage[currentIndex]}
                       style={styles.imageStyle}
                       resizeMode="cover" />
                  {userChoice && (
                       <View style={styles.resultView}>
                             <Text>Computer </Text>
                             <Image source={renderComputerChoiceImage()} style={styles.imageStyle} />
                             <Text>You </Text>
                             <Image source={renderUserChoiceImage(userChoice)} style={styles.imageStyle} />
                             <Text style={{ marginTop: 12, fontSize: 18 }}>Result: {result ?? ''}</Text>
                             <TouchableOpacity key='paper_choice' onPress={() => playAgain()} style={styles.resultView}>
                                <Text> PLAY AGAIN </Text>
                             </TouchableOpacity>
                       </View>
                  )}

              <View style={styles.choicesContainer}>
                  <TouchableOpacity key='paper_choice' onPress={() => playGame('paper')}>
                    <Image source={require('@/assets/images/paper.png')}
                           style={styles.imageStyle}  />
                  </TouchableOpacity>
                  <TouchableOpacity key='rock_choice' onPress={() => playGame('rock')}>
                    <Image source={require('@/assets/images/rock.png')}
                           style={styles.imageStyle} />
                  </TouchableOpacity>
                  <TouchableOpacity key='scissor_choice' onPress={() => playGame('scissor')}>
                    <Image source={require('@/assets/images/scissor.png')}
                           style={styles.imageStyle} />
                  </TouchableOpacity>
              </View>
              <Text style={styles.gameCount}> CREDIT: {gameCount} / 5</Text>
            </View>
        );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, marginBottom: 20 },
  choicesContainer: { flexDirection: 'row', gap: 10 , marginTop : '30%'},
  buttonText: { fontSize: 20, color: 'blue', padding: 10 },
  imageStyle: { width: 100, height: 100 },
  playAgainButton: { marginTop: 60},
  resultView: { marginTop: 60},
  gameCount: { marginTop: 20 , fontSize : 20}
});