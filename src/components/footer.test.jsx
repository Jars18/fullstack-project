import {describe, it, expect} from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './footer'


describe('footer', ()=>{
    it('Muestra las tareas registradas', ()=>{
        //Arrange
        const taskCounter = 3
        const tasksCompleteCounter =2
        render(<Footer tasksCounter={taskCounter}
        tasksCompleteCounter={tasksCompleteCounter}/>)
        //Act
        // const resultado = footer(4)
        //Assert
        expect(screen.getByText("Diplomado FullStack")).toBeInTheDocument();
        expect(screen.getByText("Tienes 3 tareas registradas")).toBeInTheDocument();
        expect(screen.getByText("Tienes 2 tareas terminadas")).toBeInTheDocument();
        expect(screen.getByText("Copyright © JaRs ~ 2026")).toBeInTheDocument();
    })
})