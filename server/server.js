const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// مسار API وهمي لتوليد المخططات
app.post('/api/generate-diagrams', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  const fakeResponse = {
    useCases: {
      actors: ['User', 'Admin'],
      cases: ['Login', 'CreateReport'],
      relationships: [
        { actor: 'User', useCase: 'Login', type: 'associates' },
        { actor: 'Admin', useCase: 'CreateReport', type: 'associates' }
      ]
    },
    classes: [
      {
        name: 'User',
        attributes: ['username', 'password'],
        methods: ['login()', 'logout()'],
        relationships: [{ type: 'association', target: 'Report' }]
      },
      {
        name: 'Report',
        attributes: ['title', 'content'],
        methods: ['generate()', 'send()'],
        relationships: []
      }
    ],
    sequence: [
      { actor: 'User', messages: ['login()', 'logout()'] },
      { actor: 'Admin', messages: ['createReport()', 'sendReport()'] }
    ]
  };

  res.json(fakeResponse);
});

app.use(express.static('../public'));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
