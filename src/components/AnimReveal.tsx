import { motion } from 'framer-motion';

interface Props {
  items: {
    initX?: number;
    initOpacity: number;
    component: any;
  }[];
}

const AnimReveal = ({ items }: Props) => {
  return (
    <>
      {items.map((item, index) => (
        <motion.div
          initial={{ x: item.initX || 0, opacity: item.initOpacity || 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          exit={{ opacity: 0 }}
          key={index}
        >
          {item.component}
        </motion.div>
      ))}
    </>
  );
};

export default AnimReveal;
