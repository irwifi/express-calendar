module.exports = expressCalendar

function expressCalendar (router) {
  router.get('/:year(\\d{4})/', expressCalendarMiddleware)
  router.get('/:year(\\d{4})/:month(\\d{2})/', expressCalendarMiddleware)
  router.get('/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/', expressCalendarMiddleware)
}

function expressCalendarMiddleware (req, res, next) {
  res.json(req.params)
}
