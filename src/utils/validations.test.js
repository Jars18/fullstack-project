import { describe, it, expect } from "vitest";
import {countCompletedTasks} from './validations'

describe('countCompletedTasks', ()=>{
    it('deberia contar las tareas completadas', ()=>{
        //Arrange
        const tasks = [
          { id: 1, isComplete: true, title: "Estudiar JS" },
          { id: 2, isComplete: true, title: "Estudiar CSS" },
          { id: 3, isComplete: false, title: "Estudiar HTML" },
        ];
        //Act
        
        //Assert
        expect(countCompletedTasks(tasks)).toBe(2)
    })

    it('deberia devolver 0 si no hay tareas completadas', ()=>{
        //Arrange
        const tasks = [
          { id: 1, isComplete: false, title: "Estudiar JS" },
          { id: 2, isComplete: false, title: "Estudiar CSS" },
          { id: 3, isComplete: false, title: "Estudiar HTML" },
        ];
        //Act
        
        //Assert
        expect(countCompletedTasks(tasks)).toBe(0)
    })

    it('debería devolver 0 si el arreglo está vacío', ()=>{
        //Arrange
        const tasks = [
        ];
        //Act
        
        //Assert
        expect(countCompletedTasks(tasks)).toBe(0)
    })
})