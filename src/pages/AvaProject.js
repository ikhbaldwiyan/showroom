import React from 'react'
import MainLayout from './layout/MainLayout'
import FansRoom from 'components/FansRoom'

function AvaProject(props) {
  const fansRoom = [
    {
      id: '346111',
      name: 'SZO'
    },
    {
      id: '346284',
      name: 'Gurita 48'
    },
    {
      id: '355299',
      name: 'Petani Showroom'
    },
  ];

  return (
    <div>
      <MainLayout {...props}>
        <section>
          <h3 className="mb-4">Fans Avatar Project</h3>
          <div className="container-grid">
            {fansRoom.map((item, idx) => (
              <FansRoom key={idx} roomId={item.id} />
            ))}
          </div>
        </section>
      </MainLayout>
    </div>
  )
}

export default AvaProject
