import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import TaskInput from "./task_input";
import { describe, expect, it, vi } from "vitest";

describe('taskInput', ()=>{
    it('Se renderiza el boton y el input', ()=>{
        render(<TaskInput addTask={vi.fn()}/>)

        expect(screen.getByPlaceholderText("Nueva tarea...")).toBeInTheDocument
        expect(screen.getByRole("button", {
            name: /Añade una nueva tarea/i,
        })
    ).toBeInTheDocument();
    })

    it("llama a addTask cuando se agrega una tarea", async () => {
        const addTaskMock = vi.fn();

        render(<TaskInput addTask={addTaskMock} />);

        const usuario = userEvent.setup();

        const input = screen.getByPlaceholderText("Nueva tarea...");

        await usuario.type(input, "Comprar pan");
        await usuario.click(
            screen.getByRole("button", {
            name: /Añade una nueva tarea/i,
            })
        );

        expect(addTaskMock).toHaveBeenCalledTimes(1);
        expect(addTaskMock).toHaveBeenCalledWith("Comprar pan");
    });
})