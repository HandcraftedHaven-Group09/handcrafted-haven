export default function HorizontalBar({
  text,
  color,
  thickness,
}: {
  text?: string;
  color?: string;
  thickness?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <span
        style={{
          width: '100%',
          height: thickness || '1px',
          backgroundColor: color || 'black',
          borderRadius: `${thickness} 0 0 ${thickness}`,
        }}
      ></span>
      <span style={{ whiteSpace: 'nowrap', margin: '.5rem' }}>
        {text ? text : null}
      </span>
      <span
        style={{
          width: '100%',
          height: thickness || '1px',
          backgroundColor: color || 'black',
          borderRadius: `0 ${thickness} ${thickness} 0`,
        }}
      ></span>
    </div>
  );
}
