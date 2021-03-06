import '../bower_components/webcomponentsjs/webcomponents-loader';
import {assert} from '@open-wc/testing';
import './hui-view-mock.js';
import '../power-wheel-card.js';
import {setCard} from './test_main';

describe('<power-wheel-card> in debug mode', () => {
  let card, hass, config;

  beforeEach(async () => {
    config = {
      type: "custom:power-wheel-card",
      solar_power_entity: "sensor.solar_power",
      grid_power_consumption_entity: "sensor.grid_power_consumption",
      grid_power_production_entity: "sensor.grid_power_production",
      debug: true,
    };
    hass = {
      config: {
        version: "1.2.3",
      },
      states: {
        "sensor.solar_power": {
          attributes: {
            unit_of_measurement: "W",
          },
          entity_id: "sensor.solar_power",
          state: "500.1",
        },
        "sensor.grid_power_consumption": {
          attributes: {
            unit_of_measurement: "W",
          },
          entity_id: "sensor.grid_power_consumption",
          state: "1799.9",
        },
        "sensor.grid_power_production": {
          attributes: {
            unit_of_measurement: "W",
          },
          entity_id: "sensor.grid_power_production",
          state: "0",
        },
      },
    };

    card = await setCard(hass, config);
  });

  it('has set default config values', () => {
    assert.isTrue(card.config.debug, 'Card parameter debug should be set');
  });

  it('has set card property values after setConfig', () => {
    assert.equal(card.messages[0].type, 'warn', 'Card property messages[0].type should be set');
    assert.isTrue(card.messages[0].text.includes('Debug mode is on.'), 'Card property messages[0].text should be set');
    assert.equal(card.messages.length, 1, 'Card property messages should have correct length');
  });

  it('has debug warning', () => {
    assert.equal(card.shadowRoot.querySelectorAll('.message').length, 1, 'There should be a message');
  });

});
