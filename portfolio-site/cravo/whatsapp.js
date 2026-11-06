export function buildWhatsAppUrl({brand,service,idea}) {
  const name=String(brand??'').trim(),project=String(idea??'').trim();
  if(!name||!project)throw new Error('Preencha o nome da marca e conte o que você precisa.');
  const subject=String(service??'Quero descobrir com a Cravo').trim();
  const message=`Olá, Cravo! Quero conversar sobre um projeto.\n\nMinha marca: ${name}\nServiço: ${subject}\n\nO que preciso:\n${project}`;
  return `https://wa.me/5519997066833?text=${encodeURIComponent(message)}`;
}
