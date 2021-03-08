import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'


export const ChallengesContext = createContext({} as ChallengesContextData)


interface ChallengesContextData {
    level: number,
    currentExperience: number,

}
interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengeCompleted: number
}



export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience)
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted)


    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengeCompleted', String(challengeCompleted))
    }, [level, currentExperience, challengeCompleted])

    function levelUp() {
        setLevel(level + 1)
    }


    return (
        <ChallengesContext.Provider 
            value={{
                level,
                currentExperience,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}