export default function LivingCost({ props }) {
  return (
    <div
      className="text-light_black"
      dangerouslySetInnerHTML={{ __html: props.living_costs }}
      id="livingCost"
    />
  );
}
