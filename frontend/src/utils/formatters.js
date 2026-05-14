export const formatDate = (date) => new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
export const formatTime = (date) => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(date));
export const initials = (name = 'ST') => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
