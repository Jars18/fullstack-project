interface TaskCardProps {
  text: string;
}
export default function TaskCard(props: TaskCardProps) {
  return <div>{props.text}</div>;
}
