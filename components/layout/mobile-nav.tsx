'use client';

import { cn } from '@/lib/utils';
import { IconMenu3 } from '@tabler/icons-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import LanguageSelector from './language-selector';
import { Link } from '@/i18n/navigation';

interface NavItem {
  key: string;
  label: string;
}

interface NavMenuProps {
  navItems: NavItem[];
}

const MobileNav = ({ navItems }: NavMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative block xl:hidden">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger
          aria-label="Menu"
          render={
            <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
              <IconMenu3
                size={40}
                className={cn(
                  'text-accent transition-transform duration-200 active:scale-[0.97]',
                  menuOpen ? 'rotate-90 ' : 'rotate-0'
                )}
                aria-label="Menu"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </button>
          }
        />
        <SheetContent>
          <SheetHeader>
            <p className="text-2xl font-semibold">MartonRuzsik</p>
          </SheetHeader>

          <nav className="flex flex-col items-center gap-6 pt-8">
            <LanguageSelector onSelect={() => setMenuOpen(false)} />
            <div className="w-full h-px bg-border my-4"></div>
            {navItems.map((item) => (
              <Link
                aria-label={item.label}
                href={`/#${item.key}`}
                key={item.key}
                className="relative group capitilize text-xl font-medium hover:text-accent transition-all duration-150 active:scale-[0.97]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
