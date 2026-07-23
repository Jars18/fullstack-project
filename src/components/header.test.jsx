import {describe, it, expect} from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './headers'


describe('header', ()=>{
    it('Muestra la cabecera de la page', ()=>{
        //Arrange
        render(<Header/>)
        //Act
        //Assert
        expect(screen.getByText("Task Manager 1.0 Jurgen")).toBeInTheDocument();
        expect(screen.getByText("Registra tus tareas")).toBeInTheDocument();
    })
})