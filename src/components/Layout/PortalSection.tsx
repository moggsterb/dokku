interface Props {
  id: string;
  className: string;
}

const PortalSection = ({ id, className }: Props) => (
  <div className={className}>
    <div id={id} />
  </div>
);

export default PortalSection;
