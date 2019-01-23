import * as effects from 'redux-saga/effects';
// import { takeLatest, put, call } from 'redux-saga/effects';
const { takeLatest } = effects;
import counter from "../models/counter";

function* takeSages(models) {
    for (const key of Object.keys(models.effects)) {
        yield takeLatest(
        	`${models.namespace}/${key}`,
        	(action) => models.effects[key](action, effects)
        )
    }
}

export default function* rootSagas() {
    yield takeSages(counter);
}
