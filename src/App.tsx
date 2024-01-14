import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import SeasonCalendar from './components/SeasonCalendar/SeasonCalendar';
import Championship from './components/Championship/Championship';

const App = () => {
  return (
    <Tabs isFitted variant='enclosed' className='font-oswald'>
      <TabList className='sticky top-0 z-50 bg-[#D01110]'>
        <Tab textColor={'#EBE8E0'} className='font-bold'>Season Calendar</Tab>
        <Tab textColor={'#EBE8E0'} className='font-bold'>Championship</Tab>
      </TabList>
      <TabPanels>
        <TabPanel className='!p-0'>
          <SeasonCalendar />
        </TabPanel>
        <TabPanel className='!p-0' >
          <Championship />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
