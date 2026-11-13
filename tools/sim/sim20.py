# sim20.py: offline check of pre-run 20's probe-1 controller (the runner's move() rule, re-typed 1:1) against landings that do
# NOT depend on the rate (pre-run 19's finding: a block ceiling). Each decided minute draws the lane's landed/reference ratio
# from pre-run 19's 12 observed lane minutes at 150-719 (HOLD-1 and greedy): no model of the chain, the mempool or the tiers.
import random, statistics as st
R=[462/513,522/513,494/513,513/513,515/513,521/513,496/513,527/513,559/513,504/513,521/513,458/513]
def run(rule, dec, seed):
    rnd=random.Random(seed); a=150; ok=0; path=[a]
    for _ in range(dec):
        m=rnd.choice(R)
        tgt = 1.0 if rule=='greedy100' else 0.9
        if m < tgt: a=min(2000, round(a*1.25)); ok=0
        else:
            ok+=1
            if ok>=2:
                if rule!='greedy100': a=max(100, round(a*0.8))
                ok=0
        path.append(a)
    return path
for rule,dec in [('greedy100',6),('normal90',5)]:
    ends=[run(rule,dec,s)[-1] for s in range(20000)]
    ups=[sum(1 for i in range(1,len(p)) if p[i]>p[i-1]) for p in (run(rule,dec,s) for s in range(20000))]
    q=sorted(ends)
    print(rule, 'decisions',dec,'end median',st.median(ends),'p10',q[len(q)//10],'p90',q[9*len(q)//10],'P(end>150)',round(sum(e>150 for e in ends)/len(ends),2),'P(end<=150)',round(sum(e<=150 for e in ends)/len(ends),2),'mean ups',round(st.mean(ups),2))
    print('  example paths', [run(rule,dec,s) for s in (1,2,3)])
print('share of minutes under 100%:', round(sum(r<1 for r in R)/len(R),2), ' under 90%:', round(sum(r<0.9 for r in R)/len(R),2))
