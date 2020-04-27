import { delay } from 'redux-saga';

export default {
  async GetNotifications() {
    console.warn("REAL NOTIFICATION SERVICE! CONTACTING APIS!");

    // Simulation, actual service implementation will have more stuff here!
    await delay(1000);
    return { count: 42 };
  }
}
