// New version, new axes, new algorithm ?

export const pairedAxes = {
  constructivism: {
    pair: 'identity',
    legacyKey: 'c0',
    color: '#a425b6'
  },
  essentialism: {
    pair: 'identity',
    legacyKey: 'c1',
    color: '#34b634'
  },
  rehabilitative_justice: {
    pair: 'justice',
    legacyKey: 'j0',
    color: '#14bee1'
  },
  punitive_justice: {
    pair: 'justice',
    legacyKey: 'j1',
    color: '#e6cc27'
  },
  progressive: {
    pair: 'culture',
    legacyKey: 's0',
    color: '#850083'
  },
  conservative: {
    pair: 'culture',
    legacyKey: 's1',
    color: '#970000'
  },
  internationalism: {
    pair: 'globalism',
    legacyKey: 'b0',
    color: '#3e6ffd'
  },
  nationalism: {
    pair: 'globalism',
    legacyKey: 'b1',
    color: '#ff8500'
  },
  communism: {
    pair: 'economy',
    legacyKey: 'p0',
    color: '#cc0000'
  },
  capitalism: {
    pair: 'economy',
    legacyKey: 'p1',
    color: '#ffb800'
  },
  regulation: {
    pair: 'markets',
    legacyKey: 'm0',
    color: '#269B32'
  },
  laissez_faire: {
    pair: 'markets',
    legacyKey: 'm1',
    color: '#6608C0'
  },
  ecology: {
    pair: 'environment',
    legacyKey: 'e0',
    color: '#a0e90d'
  },
  production: {
    pair: 'environment',
    legacyKey: 'e1',
    color: '#4deae9'
  },
  revolution: {
    pair: 'radicalism',
    legacyKey: 't0',
    color: '#eb1a66'
  },
  reform: {
    pair: 'radicalism',
    legacyKey: 't1',
    color: '#0ee4c8'
  },
  materialism: {
    pair: 'perspective',
    color: '#ff00ff'
  },
  idealism: {
    pair: 'perspective',
    color: '#00ffff'
  },
  sustainability: {
    pair: 'development',
    color: '#00ff00'
  },
  growth_at_all_costs: {
    pair: 'development',
    color: '#ff0000'
  }
} as const satisfies Record<string, PairedAxis>
