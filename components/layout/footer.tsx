'use client';

import { IconBrandFacebook, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

const Footer = () => {
  return (
    <div className="relative container mx-auto py-8 mt-16">
      <div className="relative flex flex-col md:flex-row justify-between items-center z-10">
        <h2 className="text-xl">Márton László Ruzsik</h2>
        <div className="flex gap-6 mt-3 md:mt-0">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/RuzsikMarton"
            className="link-buttons"
            aria-label="GitHub"
          >
            <IconBrandGithub />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/m%C3%A1rton-ruzsik-47561b313/"
            className="link-buttons"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedin />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/marton.ruzsik/"
            className="link-buttons"
            aria-label="Facebook"
          >
            <IconBrandFacebook />
          </a>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"
      />
    </div>
  );
};

export default Footer;
