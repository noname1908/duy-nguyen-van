import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency, parseCurrencyToNumber } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';
import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Currency {
  currency: string;
  date?: string;
  price: number;
}

const defaultCurrency: Currency = {
  currency: 'USD',
  date: new Date().toISOString(),
  price: 1,
};

const formSchema = z.object({
  inputAmount: z.coerce.number(),
  inputCurrency: z.string(),
  outputAmount: z.string(),
  outputCurrency: z.string(),
});

const API_URL = 'https://interview.switcheo.com/prices.json';

function App() {
  const refSubmitButton = useRef<HTMLButtonElement>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([defaultCurrency]);

  const handleFetchData = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setCurrencies(_.unionBy(data, 'currency'));
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputAmount: currencies[0].price,
      inputCurrency: currencies[0].currency,
      outputAmount: `${currencies[0].price}`,
      outputCurrency: currencies[0].currency,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const inputPrice = _.find(currencies, { currency: values.inputCurrency });
    const inputAmount = values.inputAmount;
    const outPutPrice = _.find(currencies, { currency: values.outputCurrency });

    const outputAmount = (inputAmount * outPutPrice!.price) / inputPrice!.price;

    await new Promise((resolve) => setTimeout(resolve, 1000)); // fake request to server

    form.setValue('outputAmount', formatCurrency(outputAmount));
  }

  const handleSwitchCurrency = async () => {
    const { inputCurrency, outputCurrency, outputAmount, inputAmount } =
      form.getValues();
    form.reset({
      inputAmount: parseCurrencyToNumber(outputAmount),
      inputCurrency: outputCurrency,
      outputCurrency: inputCurrency,
      outputAmount: formatCurrency(inputAmount),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-20">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">Swap</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center border border-input rounded">
                <div className="flex items-center w-full px-3 border-r">
                  <Label
                    htmlFor="input-amount"
                    className="whitespace-nowrap text-muted-foreground"
                  >
                    Amount to send
                  </Label>

                  <FormField
                    control={form.control}
                    name="inputAmount"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id="input-amount"
                          type="tel"
                          pattern="^([0-9]*[.])?[0-9]*$"
                          title="Please input a correct number"
                          className="border-none focus-visible:ring-0 text-right focus-visible:ring-offset-0"
                        />
                      </FormControl>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="inputCurrency"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          id="framework"
                          className="max-w-48 rounded-l-none focus:ring-0 border-none focus:ring-offset-0"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {currencies.map((currency, idx) => (
                          <SelectItem
                            key={currency.currency + idx}
                            value={currency.currency}
                          >
                            <div className="flex items-center gap-1">
                              <span className="w-5">
                                <img
                                  alt=""
                                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency.currency}.svg`}
                                />
                              </span>
                              <span> {currency.currency}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-10 p-0 self-end"
                onClick={handleSwitchCurrency}
              >
                <ArrowUpDownIcon size={20} className="text-muted-foreground" />
              </Button>

              <div className="flex items-center border border-input rounded">
                <div className="flex items-center w-full px-3 border-r">
                  <Label
                    htmlFor="output-amount"
                    className="whitespace-nowrap text-muted-foreground"
                  >
                    Amount to receive
                  </Label>
                  <FormField
                    control={form.control}
                    name="outputAmount"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                          id="output-amount"
                          type="tel"
                          className="border-none focus-visible:ring-0 text-right focus-visible:ring-offset-0"
                        />
                      </FormControl>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="outputCurrency"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          id="framework"
                          className="max-w-48 rounded-l-none focus:ring-0 border-none focus:ring-offset-0"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectContent position="popper">
                          {currencies.map((currency, idx) => (
                            <SelectItem
                              key={currency.currency + idx}
                              value={currency.currency}
                            >
                              <div className="flex items-center gap-1">
                                <span className="w-5">
                                  <img
                                    alt=""
                                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency.currency}.svg`}
                                  />
                                </span>
                                <span> {currency.currency}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Button
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
                type="submit"
                className="flex-1"
                loading={form.formState.isSubmitting}
                ref={refSubmitButton}
              >
                CONFIRM SWAP
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
