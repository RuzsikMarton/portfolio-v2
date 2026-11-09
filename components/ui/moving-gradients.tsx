const blobs = [
  {
    color: '18 113 255',
    anim: 'blob-vertical',
    duration: '30s',
    origin: 'center center',
    opacity: 0.5,
  },
  {
    color: '0 191 255',
    anim: 'blob-circle',
    duration: '40s',
    origin: 'calc(50% + 400px)',
    opacity: 0.5,
  },
  {
    color: '38 64 80',
    anim: 'blob-horizontal',
    duration: '40s',
    origin: 'calc(50% - 200px)',
    opacity: 0.3,
  },
  {
    color: '117 197 251',
    anim: 'blob-circle',
    duration: '25s',
    origin: 'calc(50% - 800px) calc(50% + 800px)',
    opacity: 0.5,
  },
];

export default function MovingGradients() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-30"
    >
      <div className="absolute inset-0 blur-3xl [--blob-size:clamp(24rem,60vw,56rem)]">
        {blobs.map((blob, i) => (
          <div
            key={i}
            className="gradient-blob"
            style={
              {
                '--blob-color': blob.color,
                '--blob-anim': blob.anim,
                '--blob-duration': blob.duration,
                '--blob-origin': blob.origin,
                opacity: blob.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
