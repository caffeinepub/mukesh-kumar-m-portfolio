const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/assets/generated/design-grid.dim_800x800.png)',
          backgroundSize: '800px 800px',
          backgroundRepeat: 'repeat',
          animation: 'gridScroll 20s linear infinite',
        }}
      />
    </div>
  );
};

export default ParticleBackground;
