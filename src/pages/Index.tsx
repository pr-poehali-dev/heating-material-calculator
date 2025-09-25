import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

function Index() {
  const [calculatorData, setCalculatorData] = useState({
    roomArea: '',
    ceilingHeight: '',
    heatLoss: '',
    pipeLength: '',
    pipeDiameter: ''
  });

  const [results, setResults] = useState({
    totalPipeLength: 0,
    recommendedDiameter: 0,
    materialCost: 0
  });

  const calculateMaterials = () => {
    const area = parseFloat(calculatorData.roomArea) || 0;
    const height = parseFloat(calculatorData.ceilingHeight) || 2.5;
    const volume = area * height;
    
    // Простой расчет для демонстрации
    const totalLength = volume * 0.8; // примерный коэффициент
    const diameter = area > 50 ? 25 : area > 20 ? 20 : 16;
    const cost = totalLength * (diameter === 25 ? 350 : diameter === 20 ? 280 : 220);
    
    setResults({
      totalPipeLength: Math.round(totalLength),
      recommendedDiameter: diameter,
      materialCost: Math.round(cost)
    });
  };

  const navigationItems = [
    { id: 'main', title: 'Главная', icon: 'Home' },
    { id: 'materials', title: 'Материалы', icon: 'Package' },
    { id: 'calculators', title: 'Калькуляторы', icon: 'Calculator' },
    { id: 'instructions', title: 'Инструкции', icon: 'BookOpen' },
    { id: 'consultations', title: 'Консультации', icon: 'MessageCircle' },
    { id: 'contacts', title: 'Контакты', icon: 'Phone' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-heating-gray to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-heating-orange rounded-lg flex items-center justify-center">
                <Icon name="Thermometer" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-heating-blue">ТеплоКалькулятор</h1>
                <p className="text-sm text-gray-500">Профессиональный расчет отопления</p>
              </div>
            </div>
            <Button variant="outline" className="hidden md:flex">
              <Icon name="Phone" size={16} className="mr-2" />
              Консультация
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <Icon name={item.icon as any} size={16} className="text-heating-orange" />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Hero Section */}
          <div className="lg:col-span-2">
            <div className="mb-8 animate-fade-in">
              <h2 className="text-4xl font-bold text-heating-blue mb-4">
                Расчет материалов для системы отопления
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Профессиональные калькуляторы для точного расчета длины и диаметра труб, 
                количества радиаторов и других компонентов отопительной системы.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-heating-orange text-white">
                  <Icon name="Zap" size={14} className="mr-1" />
                  Быстро
                </Badge>
                <Badge variant="secondary" className="bg-heating-blue text-white">
                  <Icon name="Target" size={14} className="mr-1" />
                  Точно
                </Badge>
                <Badge variant="secondary" className="bg-green-500 text-white">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Профессионально
                </Badge>
              </div>
            </div>

            {/* Calculator Card */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Calculator" className="mr-2 text-heating-orange" />
                  Калькулятор труб отопления
                </CardTitle>
                <CardDescription>
                  Рассчитайте необходимую длину и диаметр труб для вашей системы отопления
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Базовый расчет</TabsTrigger>
                    <TabsTrigger value="advanced">Расширенный</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="roomArea">Площадь помещения (м²)</Label>
                        <Input
                          id="roomArea"
                          type="number"
                          placeholder="50"
                          value={calculatorData.roomArea}
                          onChange={(e) => setCalculatorData({...calculatorData, roomArea: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ceilingHeight">Высота потолков (м)</Label>
                        <Input
                          id="ceilingHeight"
                          type="number"
                          placeholder="2.7"
                          value={calculatorData.ceilingHeight}
                          onChange={(e) => setCalculatorData({...calculatorData, ceilingHeight: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={calculateMaterials}
                      className="w-full bg-heating-orange hover:bg-orange-600"
                    >
                      <Icon name="Calculator" size={16} className="mr-2" />
                      Рассчитать материалы
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="heatLoss">Теплопотери (Вт/м²)</Label>
                        <Input
                          id="heatLoss"
                          type="number"
                          placeholder="100"
                          value={calculatorData.heatLoss}
                          onChange={(e) => setCalculatorData({...calculatorData, heatLoss: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pipeLength">Длина контура (м)</Label>
                        <Input
                          id="pipeLength"
                          type="number"
                          placeholder="80"
                          value={calculatorData.pipeLength}
                          onChange={(e) => setCalculatorData({...calculatorData, pipeLength: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={calculateMaterials}
                      className="w-full bg-heating-blue hover:bg-blue-700"
                    >
                      <Icon name="Settings" size={16} className="mr-2" />
                      Расширенный расчет
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Results Card */}
            {results.totalPipeLength > 0 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-heating-blue">Результаты расчета</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Длина труб:</span>
                    <Badge variant="outline" className="text-heating-orange font-semibold">
                      {results.totalPipeLength} м
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Диаметр:</span>
                    <Badge variant="outline" className="text-heating-blue font-semibold">
                      {results.recommendedDiameter} мм
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Стоимость:</span>
                    <Badge className="bg-green-500 font-semibold">
                      {results.materialCost.toLocaleString()} ₽
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Services Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-blue flex items-center">
                  <Icon name="Wrench" className="mr-2" />
                  Наши услуги
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: 'Calculator', title: 'Расчет материалов', desc: 'Точные расчеты для любых систем' },
                  { icon: 'FileText', title: 'Инструкции', desc: 'Подробные руководства по монтажу' },
                  { icon: 'Phone', title: 'Консультации', desc: 'Профессиональная поддержка' },
                  { icon: 'Truck', title: 'Поставка', desc: 'Доставка материалов на объект' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-heating-orange rounded-full flex items-center justify-center">
                      <Icon name={service.icon as any} size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{service.title}</p>
                      <p className="text-xs text-gray-500">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heating-blue">Нужна помощь?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Получите профессиональную консультацию по расчету системы отопления
                </p>
                <Button className="w-full bg-heating-orange hover:bg-orange-600">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Связаться с экспертом
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-heating-blue text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">ТеплоКалькулятор</h3>
              <p className="text-sm text-gray-300">
                Профессиональные расчеты для систем отопления
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Калькуляторы</h4>
              <ul className="space-y-2 text-sm">
                <li>Расчет труб</li>
                <li>Расчет радиаторов</li>
                <li>Теплопотери</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Материалы</h4>
              <ul className="space-y-2 text-sm">
                <li>Трубы</li>
                <li>Фитинги</li>
                <li>Радиаторы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Контакты</h4>
              <div className="space-y-2 text-sm">
                <p>+7 (978) 123-45-67</p>
                <p>г. Симферополь</p>
                <p>ул. Кизиловая</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;