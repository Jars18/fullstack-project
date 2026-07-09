interface FooterProps {
  tasksCounter: number;
  tasksCompleteCounter: number;
}
function Footer({ tasksCounter, tasksCompleteCounter }: FooterProps) {
  console.log(tasksCounter);
  return (
    <>
      <footer>Diplomado FullStack</footer>
      <div>Tienes {tasksCounter} tareas registradas</div>
      <div>Tienes {tasksCompleteCounter} tareas terminadas</div>
      <div>Copyright © JaRs ~ 2026</div>
    </>
  );
}

export default Footer;
