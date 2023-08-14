import { createContext, useContext, useState } from 'react'

type AwardProps = {
    awardWinner: string
    setAwardWinner: Function
}

export const saveAwardContext = createContext<AwardProps>({} as AwardProps)

export function AwardProvider(props: any) {
    const [awardWinner, setAwardWinner] = useState('')

    const value: AwardProps = {
        awardWinner,
        setAwardWinner
    }

    return (
        <>
            <saveAwardContext.Provider value={value} >
                <>
                    {props.children}
                </>
            </saveAwardContext.Provider>
        </>
    )
}

export function useAwardContext() {
    return useContext(saveAwardContext)
}