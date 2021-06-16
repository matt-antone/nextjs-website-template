/* This example requires Tailwind CSS v2.0+ */
import {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown';
import SalesFunnels from '../SalesFunnels'
import funnels from '../../_data/funnels'
import Modal from '../basic/Modal'
import CloudinaryImage from '../CloudinaryImage'
import Block from './Block';
import BlockContainer from './BlockContainer';

export default function SalesFunnelBlock({text}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('default')

  const toggleModal = () => {
    setOpen(!open)
  }

  const setFunnel = (funnel) => {
    setSelected(funnel)
    setOpen(true)
  }

  useEffect(()=>{
    AOS.refresh()
  })

  return (
    <Block>
      <BlockContainer>
        <div className="relative bg-brand-blue-light py-8 sm:py-24">
            <div className="prose prose-lg text-center mx-auto">
              { text ? <ReactMarkdown children={text}/> : ''}
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-2 gap-4 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-3xl mx-auto">
                {funnels.map((funnel,i) => (
                  <button
                  key={i}
                  onClick={e=> setFunnel(funnel.name)}
                  // data-aos="zoom-out"
                  // data-aos-duration={2000}
                  // data-aos-delay={300+(i*10)}
                  >
                    <CloudinaryImage
                      src={funnel.icon}
                      className="block object-fit-contain h-32 mx-auto"
                      width={120}
                      height={120}
                      ariaHidden={true}
                    />
                    {funnel.name}
                  </button>
                ))}
              </div>
            </div>
          <Modal open={open} toggleModal={toggleModal}>
              <SalesFunnels selected={selected}/>
          </Modal>
        </div>
      </BlockContainer>
    </Block>
  )
}
