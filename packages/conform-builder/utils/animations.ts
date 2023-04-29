import { Position } from './positions';

const SlideFromBottom = {
  initial: { top: 'calc(100% + 10px)', opacity: 0 },
  animate: {
    top: 'calc(100% + 5px)',
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    top: 'calc(100% + 10px)',
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const SlideFromTop = {
  initial: { bottom: 'calc(100% + 10px)', opacity: 0 },
  animate: {
    bottom: 'calc(100% + 5px)',
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    bottom: 'calc(100% + 10px)',
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const SlideFromLeft = {
  initial: { right: 'calc(100% + 10px)', opacity: 0 },
  animate: {
    right: 'calc(100% + 5px)',
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    right: 'calc(100% + 10px)',
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const SlideFromRight = {
  initial: { left: 'calc(100% + 10px)', opacity: 0 },
  animate: {
    left: 'calc(100% + 5px)',
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    left: 'calc(100% + 10px)',
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const Animation = {
  SlideFromBottom,
};

export const PositionToAnimationMap: { [k in Position]: any } = {
  'bottom-left': SlideFromBottom,
  'bottom-right': SlideFromBottom,
  'bottom-center': SlideFromBottom,

  'top-left': SlideFromTop,
  'top-right': SlideFromTop,
  'top-center': SlideFromTop,

  'left-top': SlideFromLeft,
  'left-bottom': SlideFromLeft,
  'left-center': SlideFromLeft,

  'right-top': SlideFromRight,
  'right-bottom': SlideFromRight,
  'right-center': SlideFromRight,
};
