# Regenerates assets/sounds/tick.wav and tock.wav: python scripts/make-clock-sounds.py assets/sounds
# Synthesizes an old mechanical clock's tick and tock: a sharp noise click plus a short, damped
# metallic ring. Deterministic (seeded) so rebuilding gives identical files.
import math, random, struct, sys, wave

RATE = 44100

def clock_sound(path, ring_hz, ring2_hz, length=0.07, seed=1):
    random.seed(seed)
    n = int(RATE * length)
    out = []
    lp = 0.0
    for i in range(n):
        t = i / RATE
        noise = random.uniform(-1, 1)
        lp += 0.35 * (noise - lp)               # soften the click a little
        click = (noise - lp) * math.exp(-t / 0.0018)
        ring = (0.55 * math.sin(2 * math.pi * ring_hz * t) + 0.3 * math.sin(2 * math.pi * ring2_hz * t)) * math.exp(-t / 0.011)
        body = 0.35 * math.sin(2 * math.pi * 420 * t) * math.exp(-t / 0.006)   # wooden case thump
        out.append(click * 0.9 + ring + body)
    peak = max(abs(x) for x in out)
    scale = 0.5 / peak                          # about -6 dBFS
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(b''.join(struct.pack('<h', int(max(-1, min(1, x * scale)) * 32767)) for x in out))

clock_sound(sys.argv[1] + '/tick.wav', 2600, 4100, seed=1)
clock_sound(sys.argv[1] + '/tock.wav', 1900, 3100, seed=2)
print('ok')
