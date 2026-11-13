# sim21.py (pre-run 21, offline). The runner's cap-test rule re-typed: greedy, target 1.1 x ref, never down, x2 up (cap 2000),
# cap guard 4 decided minutes at 2000 -> 150, FROZEN_ARM 2 decisions after the reset. Landed per minute drawn from pre-run 20's
# five N=8-at-460 counter minutes (hv1); ref = one of them (HOLD-1 has one decided reference minute). Fee per lane tx = rate x 266,700e-8.
import itertools, random, statistics as st
L=[244,229,225,226,234]
def run(ref, draws):
    a=600; cap_run=0; resets=0; since=0; armed=False; path=[a]; events=[]
    for i,h in enumerate(draws):
        a0=a
        if h/ref < 1.1: a=min(2000, round(a*2.0))
        cap_run = cap_run+1 if a0>=2000 else 0
        reset=False
        if cap_run>=4: events.append(('CAP_REACHED',i+1)); a=150; cap_run=0; resets+=1; since=0; reset=True
        elif resets: 
            since+=1
            if since>=2 and not armed: armed=True; events.append(('FROZEN_ARM',i+1)); path.append(a); break
        path.append(a)
    return path, events
random.seed(21); out=[]
for _ in range(20000):
    ref=random.choice(L); d=[random.choice(L) for _ in range(9)]
    out.append(run(ref,d))
paths=[tuple(p) for p,_ in out]; ok=sum(1 for _,e in out if any(x[0]=='CAP_REACHED' for x in e) and any(x[0]=='FROZEN_ARM' for x in e))
print('draws',len(out),'CAP_REACHED and FROZEN_ARM in',ok,'max ratio',max(L)/min(L))
print('most common path',max(set(paths),key=paths.count),'share',paths.count(max(set(paths),key=paths.count))/len(paths))
# rate in effect per minute (decision lands ~22 s into the next minute) and fee
p=list(max(set(paths),key=paths.count)); eff=[]
for i in range(len(p)-1): eff.append(p[i] if i==0 else (22*p[i-1]+38*p[i])/60)
eff[-1]=eff[-1]*0.25  # lane stops ~10-15 s after FROZEN_ARM
land=st.median(L); fee=sum(r*266700e-8*land for r in eff)
print('rate in effect per minute',[round(x) for x in eff],'cap-test fees ~',round(fee))
print('ref 2 min at 460 ~',round(2*460*266700e-8*land),' template 4 min at 460 x 230 ~',round(4*460*266700e-8*230))
