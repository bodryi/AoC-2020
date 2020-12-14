/**
 * Constants
 */

const input = `99
128
154
160
61
107
75
38
15
11
129
94
157
84
121
14
119
48
30
10
55
108
74
104
91
45
134
109
164
66
146
44
116
89
79
32
149
1
136
58
96
7
60
23
31
3
65
110
90
37
43
115
122
52
113
123
161
50
95
150
120
101
126
151
114
127
73
82
162
140
51
144
36
4
163
85
42
59
67
64
86
49
2
145
135
22
24
33
137
16
27
70
133
130
20
21
83
143
100
41
76
17`;

const INITIAL_JOLTAGE = 0;
const MAX_ACCEPTABLE_DIFFERENCE = 3;
const BUILT_IN_DIFFERENCE = 3;

/**
 * Code
 */

const adapters = input.split('\n').map((n) => +n);

const getJoltageDifferencesDistribution = (adapters) => {
  const distribution = {};
  for (let i = 1; i <= MAX_ACCEPTABLE_DIFFERENCE; i++) {
    distribution[i] = 0;
  }

  let currentJoltage = INITIAL_JOLTAGE;
  const max = Math.max(...adapters);
  const unusedAdapters = [...adapters];
  while (currentJoltage < max) {
    const nextAdapter = unusedAdapters
      .filter((a) => a > currentJoltage && currentJoltage + 3 >= a)
      .map((a) => ({ joltage: a, difference: a - currentJoltage }))
      .reduce((prev, curr) =>
        prev.difference < curr.difference ? prev : curr,
      );

    distribution[nextAdapter.difference]++;
    currentJoltage = nextAdapter.joltage;
    unusedAdapters.splice(
      unusedAdapters.findIndex((a) => a === nextAdapter.joltage),
      1,
    );
  }

  distribution[BUILT_IN_DIFFERENCE]++;
  return distribution;
};

const distribution = getJoltageDifferencesDistribution(adapters);
const result = distribution['1'] * distribution['3'];
console.log(result);
