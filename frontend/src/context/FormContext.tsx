import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type State = {
    currentStep: number;
    titulo: string;
    descricao: string;
    objeivo1: string;
    objeivo2: string;
    objeivo3: string;
    objeivo4: string;

}
type Action = {
    type: FormActions;
    payload: any;
}
type ContextType = {
    state: State;
    dispatch: (action: Action) => void;
}
type FormProviderProps = {
    children: ReactNode;
}

const initialData: State = {
    currentStep: 0,
    titulo: '',
    descricao: '',
    objeivo1: '',
    objeivo2: '',
    objeivo3: '',
    objeivo4: ''

}
const FormContext = createContext<ContextType | undefined>(undefined);

export enum FormActions {
    setCurrentStep,
    setTitulo,
    setDescricao,
    setObjetivo1,
    setObjetivo2,
    setObjetivo3,
    setObjetivo4
}
const formReducer = (state: State, action: Action) => {
    switch (action.type) {
        case FormActions.setCurrentStep:
            return { ...state, currentStep: action.payload };

        case FormActions.setTitulo:
            return { ...state, titulo: action.payload };

        case FormActions.setDescricao:
            return { ...state, descricao: action.payload };

        case FormActions.setObjetivo1:
            return { ...state, objetivo1: action.payload };

        case FormActions.setObjetivo2:
            return { ...state, objetivo2: action.payload };

        case FormActions.setObjetivo3:
            return { ...state, objetivo3: action.payload };

        case FormActions.setObjetivo4:
            return { ...state, objetivo4: action.payload };

        default:
            return state;
    }
}
export const FormProvider = ({ children }: FormProviderProps) => {

    const [state, dispatch] = useReducer(formReducer, initialData);
    const value = { state, dispatch };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}
export const useForm = () => {
    const context = useContext(FormContext);

    if (context === undefined) {
        throw new Error('useForm precisa ser usado dentro do FormProvider');
    }
    return context;
}