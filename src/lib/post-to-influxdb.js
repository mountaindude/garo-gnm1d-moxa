const globals = require('./globals');
const slack = require('./slack');

function postStatusToInfluxdb(energyData, influxTags) {
    // Build tags structure that will be passed to InfluxDB
    globals.logger.debug(`ENERGY DATA: Tags sent to InfluxDB: ${JSON.stringify(influxTags)}`);

    // Write the whole reading to Influxdb
    globals.influx
        .writePoints([
            {
                measurement: globals.config.get('EnergyMonitor.influxdbConfig.measurementName'),
                tags: influxTags,
                fields: {
                    a: energyData.a,
                    v_ln: energyData.v_ln,
                    w: energyData.w,
                    va: energyData.va,
                    var: energyData.var,
                    pf: energyData.pf,
                    hz: energyData.hz,

                    kwh_pos_tot: energyData.kwh_pos_tot,
                    kvarh_pos_tot: energyData.kvarh_pos_tot,
                    kwh_neg_tot: energyData.kwh_neg_tot,
                    kvarh_neg_tot: energyData.kvarh_neg_tot,
                    kw_dmd: energyData.kw_dmd,
                    kw_dmd_peak: energyData.kw_dmd_peak,

                    kwh_pos_partial: energyData.kwh_pos_partial,
                    kvarh_pos_partial: energyData.kvarh_pos_partial,
                    kwh_pos_t1: energyData.kwh_pos_t1,
                    kwh_pos_t2: energyData.kwh_pos_t2,

                    // Energy meter version fields
                    firmware_version: energyData.firmware_version,
                    firmware_revision: energyData.firmware_revision,
                    garo_id: energyData.garo_id,
                },
            },
        ])

        .then(() => {
            globals.logger.verbose('ENERGY DATA: Sent data to Influxdb.');
        })

        .catch((err) => {
            slack.slackPostMessage(`❌ POST_TO_INFLUXDB: Error saving energy data to InfluxDB: ${err.stack}`);

            globals.logger.error(`POST_TO_INFLUXDB: Error saving energy data to InfluxDB: ${err.stack}`);
        });
}

function postMemoryUsageToInfluxdb(memory, influxTags) {
    // Tags structure that will be passed to InfluxDB
    globals.logger.debug(`MEMORY DATA: Tags sent to InfluxDB: ${JSON.stringify(influxTags)}`);

    // Write the whole reading to Influxdb
    globals.influx
        .writePoints([
            {
                measurement: 'memory_usage',
                tags: influxTags,
                fields: {
                    heap_used: memory.heapUsed,
                    heap_total: memory.heapTotal,
                    external: memory.external,
                    process_memory: memory.processMemory,
                },
            },
        ])

        .then(() => {
            globals.logger.verbose('MEMORY DATA: Sent data to Influxdb.');
        })

        .catch((err) => {
            slack.slackPostMessage(`❌ POST_TO_INFLUXDB: Error saving memory usage to InfluxDB: ${err.stack}`);

            globals.logger.error(`POST_TO_INFLUXDB: Error saving memory usage to InfluxDB: ${err.stack}`);
        });
}

module.exports = {
    postStatusToInfluxdb,
    postMemoryUsageToInfluxdb,
};
