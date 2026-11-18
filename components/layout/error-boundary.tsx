'use client';

import { IconFaceIdError } from '@tabler/icons-react';
import { animate, stagger } from 'animejs';
import { useTranslations } from 'next-intl';
import { Component, createRef, ReactNode } from 'react';

interface ClassProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundaryClass extends Component<ClassProps, State> {
  private itemsRef = createRef<HTMLDivElement>();
  private iconRef = createRef<SVGSVGElement>();
  private animations: ReturnType<typeof animate>[] = [];

  state: State = {
    hasError: false,
  };
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //   // TODO: Add error logging (e.g. Sentry)
  // }

  // animate on error
  componentDidUpdate(_prevProps: ClassProps, prevState: State) {
    if (!prevState.hasError && this.state.hasError) {
      this.animateFallback();
    }
  }

  componentDidMount() {
    if (this.state.hasError) {
      this.animateFallback();
    }
  }

  componentWillUnmount() {
    this.animations.forEach((animation) => animation.pause());
  }

  animateFallback() {
    if (!this.itemsRef.current || !this.iconRef.current) return;

    const itemsAnimation = animate(this.itemsRef.current.children, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: stagger(120),
      ease: 'out(3)',
    });

    const iconAnimation = animate(this.iconRef.current, {
      rotate: [-15, 15],
      duration: 1000,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });

    this.animations = [itemsAnimation, iconAnimation];
  }

  // render the fallback if error occurs
  render() {
    if (this.state.hasError) {
      return (
        <div ref={this.itemsRef} className="flex flex-col items-center gap-4 my-20 text-center">
          <IconFaceIdError ref={this.iconRef} className="size-16 text-accent" />
          <h1 className="text-3xl font-bold max-w-5xl">{this.props.title}</h1>
          <p className="text-white/80 max-w-md">{this.props.description}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  href?: string;
}

// wrapper for translations of error messages
export default function ErrorBoundary({ children, title, description, href }: Props) {
  const t = useTranslations('errors');

  return (
    <section id={href}>
      <ErrorBoundaryClass
        title={title ? t(title) : t('title')}
        description={description ? t(description) : t('description')}
      >
        {children}
      </ErrorBoundaryClass>
    </section>
  );
}
