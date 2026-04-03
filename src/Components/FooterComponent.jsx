import React from 'react'
import { Footer } from 'flowbite-react'
import img1 from '../img/logo.png'
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext';

export default function FooterComponent() {
  const { t } = useLanguage();
  return (
    <>
      <Footer container className='border-t-2'>
        <div className='w-full max-w-7xl mx-auto'>
          <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
              <Link to='/' className=''>
                <img alt='Logo' src={img1} className='w-32' />
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
              <div>
                <Footer.Title title={t('footer.followUs')} />
                <Footer.LinkGroup col>
                  <Footer.Link href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('footer.facebook')}
                  </Footer.Link>
                  <Footer.Link href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('footer.youtube')}
                  </Footer.Link>
                  <Footer.Link href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('footer.twitter')}
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title={t('footer.about')} />
                <Footer.LinkGroup col>
                  <Footer.Link href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('footer.contact')}
                  </Footer.Link>
                  <Footer.Link href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('footer.partners')}
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title={t('footer.legal')} />
                <Footer.LinkGroup col>
                  <Footer.Link href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('footer.privacyPolicy')}
                  </Footer.Link>
                  <Footer.Link href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('footer.terms')}
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className='w-full sm:flex sm:items-center sm:justify-between'>
            <Footer.Copyright href='https://www.twilightgen.site' by='Twilight @@' year={new Date().getFullYear()} />
            <div className=' flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
              <Footer.Icon href='#' icon={BsFacebook} />
              <Footer.Icon href='#' icon={BsInstagram} />
              <Footer.Icon href='#' icon={BsGithub} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  )
}
