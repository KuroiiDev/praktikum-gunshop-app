import { useMemo, useState } from 'react'
import GunCard from '../components/GunCard.jsx'
import GUNS from '../data/guns.js'

const SORT_MODES = ['default', 'name-asc', 'name-desc', 'price-asc', 'price-desc']

const SORT_LABELS = {
  default: 'Sort: Default',
  'name-asc': 'Sort: Name (A-Z)',
  'name-desc': 'Sort: Name (Z-A)',
  'price-asc': 'Sort: Price ($ Low)',
  'price-desc': 'Sort: Price ($ High)',
}

function Catalog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [sortMode, setSortMode] = useState('default')

  const types = useMemo(() => ['All', ...new Set(GUNS.map((gun) => gun.type))], [])

  const handleCycleSort = () => {
    const currentIndex = SORT_MODES.indexOf(sortMode)
    const nextIndex = (currentIndex + 1) % SORT_MODES.length
    setSortMode(SORT_MODES[nextIndex])
  }

  const filteredGuns = useMemo(() => {
    let result = GUNS.filter((gun) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        gun.name.toLowerCase().includes(q) ||
        gun.caliber.toLowerCase().includes(q) ||
        gun.description.toLowerCase().includes(q)
      const matchesType = selectedType === 'All' || gun.type === selectedType
      return matchesSearch && matchesType
    })

    if (sortMode === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortMode === 'name-desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortMode === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortMode === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  }, [searchQuery, selectedType, sortMode])

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filteredGuns.length} pieces</span>
        </div>

        <div className="catalog-controls">
          <div className="search-box-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, caliber, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              className={`sort-switch-btn ${sortMode !== 'default' ? 'active' : ''}`}
              onClick={handleCycleSort}
              title="Click to switch sorting mode"
            >
              {SORT_LABELS[sortMode]}
            </button>
          </div>

          <div className="type-filter-bar">
            {types.map((type) => (
              <button
                key={type}
                className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {filteredGuns.length > 0 ? (
          <ul className="stock">
            {filteredGuns.map((gun) => (
              <GunCard key={gun.name} gun={gun} />
            ))}
          </ul>
        ) : (
          <p className="no-results">no guns match</p>
        )}
      </section>
    </>
  )
}

export default Catalog
