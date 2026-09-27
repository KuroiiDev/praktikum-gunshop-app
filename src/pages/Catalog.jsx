import { useMemo, useState } from 'react'
import GunCard from '../components/GunCard.jsx'
import GUNS from '../data/guns.js'

function Catalog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')

  const types = useMemo(() => ['All', ...new Set(GUNS.map((gun) => gun.type))], [])

  const filteredGuns = useMemo(() => {
    return GUNS.filter((gun) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        gun.name.toLowerCase().includes(q) ||
        gun.caliber.toLowerCase().includes(q) ||
        gun.description.toLowerCase().includes(q)
      const matchesType = selectedType === 'All' || gun.type === selectedType
      return matchesSearch && matchesType
    })
  }, [searchQuery, selectedType])

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
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, caliber, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

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
          <p className="no-results">Gak ada item nya jir..</p>
        )}
      </section>
    </>
  )
}

export default Catalog
