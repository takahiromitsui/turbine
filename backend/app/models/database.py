import datetime
from pydantic import BaseModel


class Turbine(BaseModel):
    time: datetime.datetime
    wind: float| int
    rotor: float| int
    leistung: float| int
    azimut: float| int
    prod_1: float| int
    prod_2: float| int
    btr_std_1: int
    btr_std_2: int
    gen1: float| int
    lager: float| int
    aussen: float| int
    getr_t: float| int
    status: float| int
    spann: float| int
    spann_1: float| int
    spann_2: float| int
    strom: float| int
    strom_1: float| int
    strom_2: float| int
    cos_ph: float| int
    abgabe: float| int
    bezug: float| int
    kh_zahl_1: float| int
    kh_zahl_2: float| int
    kh_digi_e: float| int
    kh_digi_i: float| int
    kh_ana_1: float| int
    kh_ana_2: float| int
    kh_ana_3: float| int
    kh_ana_4: float| int
    turbine_id: int
